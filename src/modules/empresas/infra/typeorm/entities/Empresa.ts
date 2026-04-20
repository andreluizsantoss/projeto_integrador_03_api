import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Maquina } from '../../../../maquinas/infra/typeorm/entities/Maquina';
import { Operador } from '../../../../operadores/infra/typeorm/entities/Operador';

@Entity('empresa', { schema: 'db_projeto_integrador_03' })
export class Empresa {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_empresa' })
  idEmpresa: number;

  @Column('varchar', { name: 'nome', nullable: true, length: 100 })
  nome: string | null;

  @Column('varchar', { name: 'cidade', nullable: true, length: 100 })
  cidade: string | null;

  @Column('varchar', { name: 'estado', nullable: true, length: 50 })
  estado: string | null;

  @OneToMany(() => Maquina, maquina => maquina.idEmpresa2)
  maquinas: Maquina[];

  @OneToMany(() => Operador, operador => operador.idEmpresa2)
  operadors: Operador[];
}
