import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Checklist } from './Checklist';
import { Empresa } from './Empresa';

@Index('id_empresa', ['idEmpresa'], {})
@Entity('operador', { schema: 'db_projeto_integrador_03' })
export class Operador {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_operador' })
  idOperador: number;

  @Column('varchar', { name: 'nome', nullable: true, length: 100 })
  nome: string | null;

  @Column('int', { name: 'pin', nullable: true })
  pin: number | null;

  @Column('int', { name: 'idade', nullable: true })
  idade: number | null;

  @Column('int', { name: 'id_empresa', nullable: true })
  idEmpresa: number | null;

  @OneToMany(() => Checklist, checklist => checklist.idOperador2)
  checklists: Checklist[];

  @ManyToOne(() => Empresa, empresa => empresa.operadors, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_empresa', referencedColumnName: 'idEmpresa' }])
  idEmpresa2: Empresa;
}
