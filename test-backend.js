// Simple test script to verify backend functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000'; // Change this to your deployed backend URL

async function testBackend() {
  console.log('Testing backend connection...\n');

  try {
    // Test 1: Create a calendar
    console.log('1. Creating a test calendar...');
    const createResponse = await axios.post(`${BASE_URL}/api/calendars`, {
      name: 'Test Calendar',
      description: 'Test calendar for backend verification'
    });
    
    if (createResponse.data.success) {
      console.log('✅ Calendar created successfully');
      const calendar = createResponse.data.calendar;
      console.log(`   Calendar ID: ${calendar.id}`);
      console.log(`   Share ID: ${calendar.shareId}`);
      
      // Test 2: Get calendar by ID
      console.log('\n2. Fetching calendar by ID...');
      const getResponse = await axios.get(`${BASE_URL}/api/calendars/${calendar.id}`);
      
      if (getResponse.data.success) {
        console.log('✅ Calendar retrieved successfully');
        
        // Test 3: Add availability
        console.log('\n3. Adding test availability...');
        const availabilityResponse = await axios.post(`${BASE_URL}/api/calendars/${calendar.id}/availability`, {
          name: 'Test User',
          dates: ['2024-01-15', '2024-01-16'],
          times: []
        });
        
        if (availabilityResponse.data.success) {
          console.log('✅ Availability added successfully');
          
          // Test 4: Get calendar by share ID
          console.log('\n4. Testing share link...');
          const shareResponse = await axios.get(`${BASE_URL}/api/share/${calendar.shareId}`);
          
          if (shareResponse.data.success) {
            console.log('✅ Share link working correctly');
            
            // Test 5: Get all calendars
            console.log('\n5. Fetching all calendars...');
            const allResponse = await axios.get(`${BASE_URL}/api/calendars`);
            
            if (allResponse.data.success) {
              console.log(`✅ Retrieved ${allResponse.data.calendars.length} calendars`);
            }
          }
        }
      }
    }
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    console.log(`\nYour backend URL: ${BASE_URL}`);
    console.log('Update this URL in client/src/utils/api.js for production.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running:');
      console.log('   npm start');
    }
    
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

// Run the test
testBackend(); 