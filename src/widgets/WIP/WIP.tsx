interface IProps {
  title?: string;
  subtitle?: string;
  message?: string;
  emoji?: string;
}

export const WIP = ({
  title = 'Упс! Мы ещё работаем',
  subtitle = 'Наши механики собирают страницу',
  message = '*Слышны звуки гаечного ключа и приглушенные ругательства*',
  emoji = '🚗',
}: IProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center p-8">
        <div className="mb-6 text-6xl animate-bounce">{emoji}</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
        <p className="text-xl text-gray-600 mb-2">{subtitle}</p>
        <p className="text-gray-500 italic">{message}</p>
      </div>
    </div>
  );
};
