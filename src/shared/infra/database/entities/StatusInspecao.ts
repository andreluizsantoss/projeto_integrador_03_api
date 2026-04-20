import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RespostaChecklist } from './RespostaChecklist';

@Entity('status_inspecao', { schema: 'db_projeto_integrador_03' })
export class StatusInspecao {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_status' })
  idStatus: number;

  @Column('varchar', { name: 'descricao', nullable: true, length: 50 })
  descricao: string | null;

  @OneToMany(() => RespostaChecklist, respostaChecklist => respostaChecklist.idStatus2)
  respostaChecklists: RespostaChecklist[];
}
