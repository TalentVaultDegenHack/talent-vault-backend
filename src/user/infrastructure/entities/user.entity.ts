import { UserState } from '../models/user-state.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import assert from 'node:assert';
import { UserRoleEnum } from '../models/user-role.enum';

interface Props {
  username: string;
  email: string;
  state?: UserState;
  passwordHash?: string;
  roles?: UserRoleEnum[];
  firstName?: string;
  lastName?: string;
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @Column({ type: 'varchar' })
  public username!: string;

  @Column({ default: UserState.Active, type: 'smallint' })
  public state!: UserState;

  @Column({ default: [UserRoleEnum.User], type: 'smallint', array: true })
  public roles!: UserRoleEnum[];

  @Column({ name: 'passwordHash', nullable: true, type: 'varchar' })
  private _passwordHash!: string;

  @Column({ nullable: true, type: 'varchar' })
  public firstName!: string;

  @Column({ nullable: true, type: 'varchar' })
  public lastName!: string;

  @Column({ nullable: true, type: 'varchar' })
  public blockchainAddress!: string | null;

  public setPasswordHash(hash: string) {
    assert(hash, 'Hash is required');
    this._passwordHash = hash;
  }

  public getPasswordHash() {
    return this._passwordHash;
  }

  public static factory(props: Props) {
    const entity = new UserEntity();
    entity.email = props.email;
    entity.username = props.username;
    if (props.state) {
      entity.state = props.state;
    }
    if (props.passwordHash) {
      entity.setPasswordHash(props.passwordHash);
    }
    if (props.roles && props.roles.length > 0) {
      entity.roles = props.roles;
    }
    if (props.lastName) {
      entity.lastName = props.lastName;
    }
    if (props.firstName) {
      entity.firstName = props.firstName;
    }

    return entity;
  }
}
