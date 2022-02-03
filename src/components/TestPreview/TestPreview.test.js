import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestPreview from './TestPreview';

const TestChild = () => {
  return <div>test child</div>;
};

//test suite
describe('TestPreview', () => {
  //test case
  test('renders TestPreview component', () => {
    render(
      <TestPreview questionOne='question-one' testType='fake-test'>
        <TestChild />
      </TestPreview>
    );
    expect(screen.getByText('question-one'));
    expect(screen.getByText('test child'));
  });
});
