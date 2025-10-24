import { render, screen } from '@testing-library/react';
import { CustomHeader } from '../../src/shared/CustomHeader';

describe('CustomHeader Component', () => {
  it('should create the snapshot', () => {
    const props = { description: 'Test Description', title: 'Test Title' };
    const { asFragment } = render(<CustomHeader {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render only the title', () => {
    const props = { description: undefined, title: 'Test Title' };

    render(<CustomHeader {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    // description should not be rendered
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('should render description when provided', () => {
    const props = { description: 'Test Description', title: 'Test Title' };

    render(<CustomHeader {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    const props = { title: 'Test Title' };

    render(<CustomHeader {...props} />);

    expect(screen.queryByRole('paragraph')).toBeNull();
  });
});
