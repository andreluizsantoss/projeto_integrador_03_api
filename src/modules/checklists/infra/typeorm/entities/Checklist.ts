import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operador } from '../../../../operadores/infra/typeorm/entities/Operador';
import { Maquina } from '../../../../maquinas/infra/typeorm/entities/Maquina';
import { Turno } from './Turno';
import { RespostaChecklist } from './RespostaChecklist';

@Index('id_operador', ['idOperador'], {})
@Index('id_maquina', ['idMaquina'], {})
@Index('id_turno', ['idTurno'], {})
@Entity('checklist', { schema: 'db_projeto_integrador_03' })
export class Checklist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_checklist' })
  idChecklist: number;

  @Column('datetime', { name: 'data', nullable: true })
  data: Date | null;

  @Column('int', { name: 'id_operador', nullable: true })
  idOperador: number | null;

  @Column('int', { name: 'id_maquina', nullable: true })
  idMaquina: number | null;

  @Column('int', { name: 'id_turno', nullable: true })
  idTurno: number | null;

  @ManyToOne(() => Operador, operador => operador.checklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_operador', referencedColumnName: 'idOperador' }])
  idOperador2: Operador;

  @ManyToOne(() => Maquina, maquina => maquina.checklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_maquina', referencedColumnName: 'idMaquina' }])
  idMaquina2: Maquina;

  @ManyToOne(() => Turno, turno => turno.checklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_turno', referencedColumnName: 'idTurno' }])
  idTurno2: Turno;

  @OneToMany(() => RespostaChecklist, respostaChecklist => respostaChecklist.idChecklist2)
  respostaChecklists: RespostaChecklist[];
}
