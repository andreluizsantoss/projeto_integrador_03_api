import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Checklist } from '../../../../checklists/infra/typeorm/entities/Checklist';
import { Empresa } from '../../../../empresas/infra/typeorm/entities/Empresa';

@Index('id_empresa', ['idEmpresa'], {})
@Entity('maquina', { schema: 'db_projeto_integrador_03' })
export class Maquina {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_maquina' })
  idMaquina: number;

  @Column('varchar', { name: 'nome_maquina', nullable: true, length: 100 })
  nomeMaquina: string | null;

  @Column('varchar', { name: 'tipo', nullable: true, length: 100 })
  tipo: string | null;

  @Column('int', { name: 'ano_fabricacao', nullable: true })
  anoFabricacao: number | null;

  @Column('int', { name: 'id_empresa', nullable: true })
  idEmpresa: number | null;

  @OneToMany(() => Checklist, checklist => checklist.idMaquina2)
  checklists: Checklist[];

  @ManyToOne(() => Empresa, empresa => empresa.maquinas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_empresa', referencedColumnName: 'idEmpresa' }])
  idEmpresa2: Empresa;
}
