import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || '22-22-22';
const UserId = process.env.NOW_PUBLIC_USER_ID || 'user_2LSoovL0oXdM3kxYgjRnhDOuFrA';
const SpaceId = process.env.NOW_SPACE_ID;
const BlueprintId = process.env.NOW_BLUEPRINT_ID;
console.log(UserId);
console.log(SpaceId);
console.log(BlueprintId);

// Helper function to show a toast notification with a delay
const showToastWithDelay = (content, delay) => {
  setTimeout(() => {
    toast(content, {
      position: 'top-right',
      duration: 30000, // Duration for showing the toast (in milliseconds)
    });
  }, delay);
};

const SamplePage = () => {
  const [response, setResponse] = useState(null);
  const [nameOnCard, setNameOnCard] = useState('');

  const handleClick = async () => {
    const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";

    // Payload data
    const payload = {
      field1: UserId,
      field3: SpaceId,
      field2: nameOnCard,
    };

    // Headers
    const headers = {
      Authorization: `Bearer ${authorizationKey}`,
      'Content-Type': 'application/json'
    };

    try {
      // Make the POST request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse(null);
    }
  };

  useEffect(() => {
    if (response && response.webhookResponseData && response.webhookResponseData.length > 0) {
      // Show each item's content in the webhookResponseData as a toast with a 10-second delay between each
      response.webhookResponseData.forEach((item, index) => {
        const delay = index * 10000; // 10 seconds delay for each item
        showToastWithDelay(item.content, delay);
      });
    }
  }, [response]); // Run this effect whenever the 'response' state changes

  return (
    <div>
                <Toaster />

      <h1>Create Page</h1>
      <input
        type="text"
        id="name"
        onChange={(e) => setNameOnCard(e.currentTarget.value)}
        name="name-on-card"
        className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
      />
      <button onClick={handleClick}>Make API Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SamplePage;