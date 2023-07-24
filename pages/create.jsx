// pages/SamplePage.js

import React, { useState } from 'react';


const authorizationKey = process.env.NOW_PUBLIC_API_KEY || '22-22-22';
const UserId = process.env.NOW_PUBLIC_USER_ID || '';
const SpaceId = process.env.NOW_SPACE_ID || '';
const BlueprintId = process.env.NOW_BLUEPRINT_ID || '';
console.log(UserId);
console.log(SpaceId);
console.log(BlueprintId);


const SamplePage = () => {
  const [response, setResponse] = useState(null);
  
  const handleClick = async () => {
    const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";

    // Payload data
    const payload = {
      field1: UserId,
      field2: SpaceId
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

  return (
    <div>
      <h1>Sample Page</h1>
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
