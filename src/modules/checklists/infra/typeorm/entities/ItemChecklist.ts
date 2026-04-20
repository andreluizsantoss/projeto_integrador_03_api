import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RespostaChecklist } from './RespostaChecklist';

@Entity('item_checklist', { schema: 'db_projeto_integrador_03' })
export class ItemChecklist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_item' })
  idItem: number;

  @Column('varchar', { name: 'descricao', nullable: true, length: 255 })
  descricao: string | null;

  @Column('varchar', { name: 'categoria', nullable: true, length: 100 })
  categoria: string | null;

  @OneToMany(() => RespostaChecklist, respostaChecklist => respostaChecklist.idItem2)
  respostaChecklists: RespostaChecklist[];
}
