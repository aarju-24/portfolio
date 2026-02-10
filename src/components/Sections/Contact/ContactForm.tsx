import {FC, memo, useCallback, useMemo, useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;
      setData({...data, [name]: value});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Data to send: ', data);
    },
    [data],
  );

  // ✅ UPDATED INPUT STYLES
  const inputClasses =
    'w-full rounded-md bg-white px-4 py-3 text-sm text-black placeholder-gray-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
      {/* Name */}
      <input className={inputClasses} name="name" onChange={onChange} placeholder="Name" required type="text" />

      {/* Email */}
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
      />

      {/* Message */}
      <textarea
        className={inputClasses}
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder="Message"
        required
        rows={6}
      />

      {/* ✅ UPDATED BUTTON */}
      <button
        aria-label="Submit contact form"
        className="mt-2 w-max rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        type="submit">
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
