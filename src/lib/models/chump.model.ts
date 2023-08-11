import { Table, Column, DataType, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';

const tableName = 'chumps';

@Table({tableName: tableName})
export class Chump extends Model<Chump> {
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    date!: string;

    @Column(DataType.INTEGER)
    date_bout!: number;

    @Column(DataType.STRING)
    date_aus_string!: string;

    @Column(DataType.INTEGER)
    date_year!: number;

    @Column(DataType.INTEGER)
    date_month!: number;

    @Column(DataType.INTEGER)
    date_day!: number;

    @Column(DataType.INTEGER)
    date_year_week!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.INTEGER)
    streak!: number;

    @Column(DataType.STRING)
    thanks!: string;

    @Column(DataType.STRING)
    image!: string;

    @Column(DataType.STRING)
    thumb!: string;

    @Column(DataType.STRING)
    url!: string;
}