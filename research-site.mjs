import ZAI from 'z-ai-web-dev-sdk';

async function researchSite() {
  try {
    const zai = await ZAI.create();

    console.log('Researching dbhl-enterprises.com...');
    
    const searchResult = await zai.functions.invoke("web_search", {
      query: "dbhl-enterprises.com company products services",
      num: 10
    });

    console.log('Search Results:');
    console.log(JSON.stringify(searchResult, null, 2));

  } catch (error) {
    console.error('Research failed:', error.message);
  }
}

researchSite();