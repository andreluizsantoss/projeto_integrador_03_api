import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Checklist } from './Checklist';
import { ItemChecklist } from './ItemChecklist';
import { StatusInspecao } from './StatusInspecao';

@Index('id_checklist', ['idChecklist'], {})
@Index('id_item', ['idItem'], {})
@Index('id_status', ['idStatus'], {})
@Entity('resposta_checklist', { schema: 'db_projeto_integrador_03' })
export class RespostaChecklist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_resposta' })
  idResposta: number;

  @Column('int', { name: 'id_checklist', nullable: true })
  idChecklist: number | null;

  @Column('int', { name: 'id_item', nullable: true })
  idItem: number | null;

  @Column('int', { name: 'id_status', nullable: true })
  idStatus: number | null;

  @ManyToOne(() => Checklist, checklist => checklist.respostaChecklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_checklist', referencedColumnName: 'idChecklist' }])
  idChecklist2: Checklist;

  @ManyToOne(() => ItemChecklist, itemChecklist => itemChecklist.respostaChecklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_item', referencedColumnName: 'idItem' }])
  idItem2: ItemChecklist;

  @ManyToOne(() => StatusInspecao, statusInspecao => statusInspecao.respostaChecklists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_status', referencedColumnName: 'idStatus' }])
  idStatus2: StatusInspecao;
}
