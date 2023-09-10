'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useTheme } from 'next-themes';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  if (theme === 'light') {
    return (
      <IconButton
        onClick={() => {
          setTheme('dark');
        }}
      >
        <MoonIcon width="16" height="16" />
      </IconButton>
    );
  }

  return (
    <IconButton
      onClick={() => {
        setTheme('light');
      }}
    >
      <SunIcon width="18" height="18" />
    </IconButton>
  );
};

export default ThemeButton;
