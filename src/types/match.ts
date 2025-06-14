export type Team = {
    id: number;
    name: string;
    logo: string;
    coach: string | null;
  };
  
  export type Championship = {
    id: number;
    name: string;
  };
  
  export type Stadium = {
    id: number;
    name: string;
    city: string;
  };
  
  export type MatchData = {
    id: number;
    team_a: Team;
    team_b: Team;
    start_in: string;
    championship: Championship;
    stadium: Stadium;
  };

