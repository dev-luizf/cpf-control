import * as Joi from 'joi';
import useful from 'useful-simple-functions';

const cpfSchema = Joi.object({
  cpf: Joi.string()
    .required()
    .min(11)
    .max(11)
    .custom((value: string, helpers) => {
      if (!useful.isCpfCnpj(value)) {
        return helpers.message({ custom: "CPF is not valid." });
      }
    }),
});

export default cpfSchema;
