// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    email: string | null;
    location: string | null;
    company: string | null;
  }