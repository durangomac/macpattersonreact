import { useState } from 'react';

const SUBJECT_OPTIONS = [
  { value: 'Comment', label: 'General Comment' },
  { value: 'Work Request', label: 'Work Request' },
  { value: 'Collaboration', label: 'Collaboration / Partnership' },
  { value: 'Question', label: 'Question' },
  { value: 'Speaking', label: 'Speaking / Interview' },
  { value: 'Other', label: 'Other' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjectType: SUBJECT_OPTIONS[0].value,
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Name, email, and message are required.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const selectedSubject = SUBJECT_OPTIONS.find((opt) => opt.value === formData.subjectType)?.label || formData.subjectType;

    const payload = {
      from_address: formData.email,
      from_name: formData.name,
      email_subject: `[${selectedSubject}] Message from macpatterson.com`,
      message_text: formData.message,
    };

    try {
      const response = await fetch('https://api.macpatterson.com/contactform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subjectType: SUBJECT_OPTIONS[0].value,
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setErrorMessage('Something went wrong sending your message. Please try again later.');
    }
  }

  return (
    <section className="page">
      <h1>Contact</h1>
      <p>If you&apos;d like to connect, use the form below. It will send directly to my contact API.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="subjectType">Subject</label>
          <select
            id="subjectType"
            name="subjectType"
            value={formData.subjectType}
            onChange={handleChange}
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn primary"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="form-status success">Thank you! Your message has been sent.</p>
        )}
        {status === 'error' && errorMessage && (
          <p className="form-status error">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
