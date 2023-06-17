export interface FetchedPost {
  id: string;
  title: string;
  link?: string;
  description: string;
  createdAt: string;
  user: {
    job: {
      color: string;
    };
    displayName: string;
  };
}
