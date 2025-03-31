import React from 'react';
import { render, screen } from '@testing-library/react';
import CountCard from '../../src/components/product/CountCard';

describe('CountCard Component', () => {
    it('renders the title correctly', () => {
        render(<CountCard title="Test Title" count={10} icon={<span>Icon</span>} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders the count correctly with "+"', () => {
        render(<CountCard title="Test Title" count={10} icon={<span>Icon</span>} />);
        expect(screen.getByText('10+')).toBeInTheDocument();
    });

    it('renders the icon correctly', () => {
        render(<CountCard title="Test Title" count={10} icon={<span>Icon</span>} />);
        expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('applies the correct class names', () => {
        const { container } = render(<CountCard title="Test Title" count={10} icon={<span>Icon</span>} />);
        expect(container.firstChild).toHaveClass('widget-card');
    });
});