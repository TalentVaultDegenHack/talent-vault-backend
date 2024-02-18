import { ContractAbstraction, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { AppConfigService } from '../../config/app-config.service';
import { Injectable, Logger } from '@nestjs/common';
import { contractCode } from '../contract/code';
import { contractStorage } from '../contract/storage';
import { char2Bytes, tzip16, Tzip16Module } from '@taquito/tzip16';

function pack(string) {
  const bytes = char2Bytes(string);
  const bytesLength = (bytes.length / 2).toString(16);
  const addPadding = `00000000${bytesLength}`;
  const paddedBytesLength = addPadding.slice(addPadding.length - 8);
  return '05' + '01' + paddedBytesLength + bytes;
}

@Injectable()
export class BlockchainService {
  private readonly _logger = new Logger(BlockchainService.name);
  private _tezos: TezosToolkit;
  private _signer: InMemorySigner;
  private _contract: ContractAbstraction<any>;

  public constructor(private _configService: AppConfigService) {
    this._tezos = new TezosToolkit(_configService.tezos.url);
    this._tezos.addExtension(new Tzip16Module());
    const params = {
      mnemonic: this._configService.tezos.privateKey,
    };
    this._signer = InMemorySigner.fromMnemonic(params);
    this._tezos.setSignerProvider(this._signer);
  }

  private async getContract(): Promise<ContractAbstraction<any>> {
    if (!this._contract) {
      this._contract = await this._tezos.contract.at(
        this._configService.tezos.contractAddress,
        tzip16,
      );
    }

    return this._contract;
  }

  public async deployContract() {
    let contract = await this._tezos.contract.originate({
      code: contractCode,
      init: contractStorage,
    });

    await contract.confirmation();
    this._logger.log(`rpc ${this._configService.tezos.url}`);
    this._logger.log('contract address: ' + contract.contractAddress);
    this._logger.log('operation results: ' + contract.operationResults);
    console.log(contract.operationResults);
  }
  public async createToken(
    owner: string,
    skillId: string,
    skillName: string,
    mentorValue: string,
    mentorCooperation: string,
    value: string,
  ) {
    const token = {
      owner: owner,
      metadata: {
        decimals: pack('0'),
        skillId: pack(skillId),
        skillName: pack(skillName),
        mentorValue: pack(mentorValue),
        mentorCooperation: pack(mentorCooperation),
        value: pack(value),
      },
    };

    const contract = await this.getContract();
    const nextId = (await contract.storage())['next_token_id'].toString();
    const send = await contract.methodsObject.mint(token).send();

    console.log('Awaiting confirmation…');
    console.log(send);

    await send.confirmation();

    return nextId;
  }
}
