import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Checklist } from './Checklist';

@Entity('turno', { schema: 'db_projeto_integrador_03' })
export class Turno {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_turno' })
  idTurno: number;

  @Column('varchar', { name: 'descricao', nullable: true, length: 50 })
  descricao: string | null;

  @Column('time', { name: 'horario_inicio', nullable: true })
  horarioInicio: string | null;

  @Column('time', { name: 'horario_fim', nullable: true })
  horarioFim: string | null;

  @OneToMany(() => Checklist, checklist => checklist.idTurno2)
  checklists: Checklist[];
}
