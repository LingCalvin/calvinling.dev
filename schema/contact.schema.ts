import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup.string().required().max(256),
  email: yup.string().required().email().max(254),
  message: yup.string().required().max(4096),
});

export default contactSchema;
