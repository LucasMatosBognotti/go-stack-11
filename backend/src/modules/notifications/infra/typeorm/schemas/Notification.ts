import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Notification;
