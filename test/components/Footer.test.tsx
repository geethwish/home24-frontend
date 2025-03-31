import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterSection from './../../src/components/Footer';

describe('FooterSection', () => {
    it('has the correct background color', () => {
        render(<FooterSection />);
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toHaveStyle('background-color: rgb(255, 255, 255)');
    });
    it('renders the correct text', () => {
        render(<FooterSection />);
        const footerElement = screen.getByText(/Home24 BXP/i);
        expect(footerElement).toBeInTheDocument();
    });
});
