import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blog app', () => {
  render(<App />);
  // The app should render the ModernBlog brand name in the navbar
  const brandElement = screen.getByText(/ModernBlog/i);
  expect(brandElement).toBeInTheDocument();
});
