import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { SkillUserEntity } from '../../skills/infrastructure/entities/skill-user.entity';
import { UserEntity } from '../../user/infrastructure/entities/user.entity';
import { AST } from 'eslint';
import Token = AST.Token;
const nameof = <T>(name: keyof T) => name;

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id!: number;

  @Column()
  @RelationId<TokenEntity>((entity) => entity.skillUser)
  public skillUserId!: SkillUserEntity['id'];

  @ManyToOne(() => SkillUserEntity)
  @JoinColumn({ name: nameof<TokenEntity>('skillUserId') })
  public skillUser!: Promise<SkillUserEntity>;

  @CreateDateColumn()
  public createdAt!: Date;

  @Column({ type: 'date', nullable: true })
  public mintedAt!: Date | null;

  @Column({ type: 'varchar', nullable: true })
  public destinationAddr: string | null;

  @Column({ type: 'boolean', default: false })
  public isMinted: boolean;

  @Column({ type: 'varchar', nullable: true })
  public address: string | null;
}
