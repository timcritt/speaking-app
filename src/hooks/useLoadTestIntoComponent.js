import { useEffect } from 'react';

const useLoadTestIntoComponent = (
  setDocRef,
  clearState,
  fetchTest,
  unsavedChanges,
  setUnsavedChanges,
  testId
) => {
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (testId !== 'new') {
        //sends the id of the current test to be displayed to the FCEPart2 context
        setDocRef(testId);

        //checks if the user previously made changes to this test and did not save the changes. Reverts to DB version if so.
        if (unsavedChanges) {
          clearState();
          setDocRef(testId);
          fetchTest();
        }
        setUnsavedChanges(false);
      } else {
        //clears context state of previously viewed Test. displays blank test to be created by user.
        clearState();
        setUnsavedChanges(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [testId]);
};

export default useLoadTestIntoComponent;
