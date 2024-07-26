import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import './ContactForm.css'; 

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    emailjs.sendForm('service_o1yxyan', 'template_r1u0u47', '#contact-form', 'R6Yhursyt_uqYs7Ac')
      .then((result) => {
        console.log('Email successfully sent:', result.text);
        alert('Ваше сообщение успешно отправлено!');
        reset();
      }, (error) => {
        console.error('Error sending email:', error.text);
        alert('Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.');
      });
  };

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Свяжитесь с нами</h2>
      <div className="form-group">
        <label>Ваше имя:</label>
        <input
          type="text"
          name="name"
          {...register('name', { required: true })}
        />
        {errors.name && <span className="error">Это поле обязательно для заполнения</span>}
      </div>
      <div className="form-group">
        <label>Ваш Email:</label>
        <input
          type="email"
          name="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span className="error">Введите корректный email</span>}
      </div>
      <div className="form-group">
        <label>Сообщение:</label>
        <textarea
          name="message"
          {...register('message', { required: true })}
        />
        {errors.message && <span className="error">Это поле обязательно для заполнения</span>}
      </div>
      <button type="submit" className="submit-button">Отправить</button>
    </form>
  );
};

export default ContactForm;
