import Airtable from 'airtable';

class AirtableService {
  private talentPoolBase: Airtable.Base;
  private talentPoolTableName: string;

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
    });
    this.talentPoolBase = Airtable.base('appqWN527HNxajNlR');
    this.talentPoolTableName = 'Developers';
  }

  getAllTalent() {
    return this.talentPoolBase(this.talentPoolTableName)
      .select({
        view: 'Grid view',
      })
      .all();
  }
}

const airtableService = new AirtableService();
export default airtableService;
