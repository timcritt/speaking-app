import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Tag from './Tag';

//test suite
describe('Tag', () => {
  //test case
  test('renders Tag component', () => {
    render(<Tag tagName='test-tag' />);
    expect(screen.getByText('#test-tag')).toBeInTheDocument();
    //shows in the console the html that is rendered
  });
  test('does not have class "tag-item-selected" when not selected', () => {
    const { container } = render(<Tag tagName='test-tag' selected={false} />);
    expect(container.getElementsByClassName('tag-item-selected').length).toBe(0);
  });
  test('has class "tag-item-selected" when selected', () => {
    const { container } = render(<Tag tagName='test-tag' selected={true} />);
    expect(container.firstChild).toHaveClass('tag-item-selected');
  });
});
