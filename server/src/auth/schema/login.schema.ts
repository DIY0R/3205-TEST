import { Static, Type } from '@sinclair/typebox';

const LoginSchemaBox = Type.Object({
  email: Type.String({ format: 'email' }),
  number: Type.Optional(Type.String()),
});
export const LoginSchema = {
  schema: {
    body: LoginSchemaBox,
  },
};

export type LoginSchemaType = Static<typeof LoginSchemaBox>;
