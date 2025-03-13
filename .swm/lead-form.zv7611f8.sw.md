---
title: Lead Form
---
# Introduction

This document will walk you through the implementation of the Lead Form feature in our application. The Lead Form is designed to collect user information and grant access to view available talent. The access control is managed using local storage to track form submission status.

We will cover:

1. How form submission status is stored and accessed.
2. The mechanism for handling form submission.
3. How access to the talent pool is controlled based on form submission.

# Form submission status storage

<SwmSnippet path="/src/App.tsx" line="12">

---

The form submission status is stored in the browser's local storage. This allows us to persist the user's access state across sessions. When the application loads, we check if the form has been submitted by retrieving the value from local storage.

```
  useEffect(() => {
    const formSubmitted = localStorage.getItem('formSubmitted') === 'true';
    setHasAccess(formSubmitted);
  }, []);
```

---

</SwmSnippet>

# Handling form submission

<SwmSnippet path="/src/components/LeadForm.tsx" line="34">

---

Upon form submission, we update the local storage to reflect that the form has been submitted. This change triggers the access control mechanism, allowing the user to view the talent pool.

```
      if (response.ok) {
        localStorage.setItem('formSubmitted', 'true');
        onSubmit();
      }
```

---

</SwmSnippet>

# Access control for talent pool

<SwmSnippet path="/src/components/TalentGrid.tsx" line="51">

---

Access to the talent pool is restricted to users who have submitted the lead form. If the form has not been submitted, the user is prompted to fill out the form to gain access. This ensures that only users who have provided their information can explore the talent pool.

```
  return (
    <div className='flex gap-8 max-[540px]:flex-col'>
      <FilterSidebar
        selectedTechStack={selectedTechStack}
        setSelectedTechStack={setSelectedTechStack}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        hasAccess={hasAccess}
        showAllTalent={showAllTalent}
        setShowAllTalent={setShowAllTalent}
      />
      <div className='flex-1 relative'>
        {!hasAccess && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={openForm}
              className='bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 z-10'
            >
              Explore Talent Pool
            </button>
          </div>
        )}
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
            !hasAccess && 'filter blur-xs'
          )}
        >
          {loading ? (
            <>
```

---

</SwmSnippet>

# Form submission process

<SwmSnippet path="src/components/LeadForm.tsx" line="21">

---

The Lead Form component handles the collection of user data and submission to a specified webhook URL. It manages the form state and submission status, providing feedback to the user during the submission process.

```
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!import.meta.env.VITE_ZAPIER_WEBHOOK_URL) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem('formSubmitted', 'true');
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
```

---

</SwmSnippet>

# Conclusion

The Lead Form feature effectively manages user access to the talent pool by leveraging local storage to track form submission status. This approach ensures that only users who have submitted the form can view the available talent, maintaining control over access to sensitive information.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBdGFsZW50LW1hcmtldHBsYWNlJTNBJTNBMTdXZWJEZXY=" repo-name="talent-marketplace"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
