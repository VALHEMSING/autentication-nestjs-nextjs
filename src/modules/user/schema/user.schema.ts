import { Document } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class User extends Document implements UserInterface {
    @Prop({ required: true, unique: true })
    username: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ default: true })
    state: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);