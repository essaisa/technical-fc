import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL!

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

const players = [
  {
    name: "Cole Palmer",
    slug: "cole-palmer",
    age: 24,
    position: "CAM",
    role: "midfielder",
    club: "CHE",
    country: "ENG",
    image: "/players/cole_palmer.png",
    apps: 109,
    goals: 46,
    assists: 21,
    rating: 7.8,
    minutes: 8120,
  
    fifaStats: { PAC: 87, SHO: 85, PAS: 90, DRI: 90, DEF: 55, PHY: 70 },
  
    radarStats: [
      { stat: "Touches", value: 72 },
      { stat: "Shot attempts", value: 80 },
      { stat: "Goal threat", value: 74 },
      { stat: "Chances created", value: 85 },
      { stat: "Aerial duels", value: 8 },
      { stat: "Defensive", value: 41 },
    ],
  
    compareStats: {
      touches: 72,
      shotAttempts: 80,
      goalThreat: 74,
      chancesCreated: 85,
      aerialDuelsWon: 8,
      defensiveContributions: 41,
      dribbles: 84,
      keyPasses: 90,
      passAccuracy: 86,
    },
  
    transferValues: [
      { season: "22/23", value: 18 },
      { season: "23/24", value: 55 },
      { season: "24/25", value: 90 },
    ],
  
    lastGames: [
      { opponent: "Liverpool", rating: 7.8 },
      { opponent: "Chelsea", rating: 6.9 },
      { opponent: "Arsenal", rating: 8.2 },
      { opponent: "Spurs", rating: 7.1 },
      { opponent: "Man City", rating: 7.5 },
    ],
  },
  
  {
    name: "Michael Olise",
    slug: "michael-olise",
    age: 24,
    position: "RW",
    role: "attacker",
    club: "FCB",
    country: "FRA",
    image: "/players/michael_olise.png",
    apps: 23,
    goals: 12,
    assists: 18,
    rating: 7.65,
    minutes: 1850,
  
    fifaStats: { PAC: 86, SHO: 82, PAS: 88, DRI: 89, DEF: 45, PHY: 68 },
  
    radarStats: [
      { stat: "Touches", value: 72 },
      { stat: "Shot attempts", value: 74 },
      { stat: "Goal threat", value: 76 },
      { stat: "Chances created", value: 92 },
      { stat: "Aerial duels", value: 12 },
      { stat: "Defensive", value: 35 },
    ],
  
    compareStats: {
      touches: 72,
      shotAttempts: 74,
      goalThreat: 76,
      chancesCreated: 92,
      aerialDuelsWon: 12,
      defensiveContributions: 35,
      passing: 88,
      ballWinning: 42,
      keyPasses: 90,
      dribbles: 89,
      passAccuracy: 84,
      progressivePasses: 86,
      tackles: 18,
      interceptions: 16,
      clearances: 8,
      blocks: 5,
      recoveries: 29,
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 22 },
      { season: "23/24", value: 55 },
      { season: "24/25", value: 75 },
    ],
  
    lastGames: [
      { opponent: "Dortmund", rating: 8.1 },
      { opponent: "Leipzig", rating: 7.6 },
      { opponent: "Leverkusen", rating: 7.9 },
      { opponent: "Stuttgart", rating: 8.4 },
      { opponent: "Frankfurt", rating: 7.2 },
    ],
  },
  
  {
    name: "Bukayo Saka",
    slug: "bukayo-saka",
    age: 24,
    position: "RW",
    role: "attacker",
    club: "ARS",
    country: "ENG",
    image: "/players/saka.png",
    apps: 222,
    goals: 59,
    assists: 48,
    rating: 7.7,
    minutes: 16890,
  
    fifaStats: { PAC: 88, SHO: 84, PAS: 86, DRI: 89, DEF: 48, PHY: 72 },
  
    radarStats: [
      { stat: "Touches", value: 69 },
      { stat: "Shot attempts", value: 86 },
      { stat: "Goal threat", value: 78 },
      { stat: "Chances created", value: 68 },
      { stat: "Aerial duels", value: 12 },
      { stat: "Defensive", value: 35 },
    ],
  
    compareStats: {
      touches: 69,
      shotAttempts: 86,
      goalThreat: 78,
      chancesCreated: 68,
      aerialDuelsWon: 12,
      defensiveContributions: 35,
      dribbles: 88,
      keyPasses: 79,
      passAccuracy: 84,
    },
  
    transferValues: [
      { season: "22/23", value: 90 },
      { season: "23/24", value: 110 },
      { season: "24/25", value: 120 },
    ],
  
    lastGames: [
      { opponent: "Chelsea", rating: 7.6 },
      { opponent: "Spurs", rating: 8.1 },
      { opponent: "Liverpool", rating: 7.2 },
      { opponent: "Man City", rating: 7.4 },
      { opponent: "Villa", rating: 8.0 },
    ],
  },
  
  {
    name: "Mohamed Salah",
    slug: "mohamed-salah",
    age: 32,
    position: "RW",
    role: "attacker",
    club: "LIV",
    country: "EGY",
    image: "/players/salah.png",
    apps: 340,
    goals: 210,
    assists: 96,
    rating: 8.4,
    minutes: 28000,
  
    fifaStats: { PAC: 90, SHO: 89, PAS: 83, DRI: 89, DEF: 45, PHY: 76 },
  
    radarStats: [
      { stat: "Touches", value: 74 },
      { stat: "Shot attempts", value: 94 },
      { stat: "Goal threat", value: 95 },
      { stat: "Chances created", value: 80 },
      { stat: "Aerial duels", value: 18 },
      { stat: "Defensive", value: 38 },
    ],
  
    compareStats: {
      touches: 74,
      shotAttempts: 94,
      goalThreat: 95,
      chancesCreated: 80,
      aerialDuelsWon: 18,
      defensiveContributions: 38,
      dribbles: 91,
      keyPasses: 82,
      passAccuracy: 85,
    },
  
    transferValues: [
      { season: "22/23", value: 80 },
      { season: "23/24", value: 70 },
      { season: "24/25", value: 60 },
    ],
  
    lastGames: [
      { opponent: "Arsenal", rating: 8.3 },
      { opponent: "Chelsea", rating: 7.9 },
      { opponent: "Spurs", rating: 8.1 },
      { opponent: "Man City", rating: 7.4 },
      { opponent: "Everton", rating: 8.5 },
    ],
  },
  
  {
    name: "Erling Haaland",
    slug: "erling-haaland",
    age: 25,
    position: "ST",
    role: "attacker",
    club: "MCI",
    country: "NOR",
    image: "/players/haaland.png",
    apps: 230,
    goals: 189,
    assists: 28,
    rating: 8.3,
    minutes: 17500,
  
    fifaStats: { PAC: 89, SHO: 94, PAS: 70, DRI: 81, DEF: 46, PHY: 91 },
  
    radarStats: [
      { stat: "Touches", value: 64 },
      { stat: "Shot attempts", value: 98 },
      { stat: "Goal threat", value: 99 },
      { stat: "Chances created", value: 60 },
      { stat: "Aerial duels", value: 88 },
      { stat: "Defensive", value: 20 },
    ],
  
    compareStats: {
      touches: 64,
      shotAttempts: 98,
      goalThreat: 99,
      chancesCreated: 60,
      aerialDuelsWon: 88,
      defensiveContributions: 20,
      dribbles: 70,
      keyPasses: 58,
      passAccuracy: 78,
    },
  
    transferValues: [
      { season: "22/23", value: 170 },
      { season: "23/24", value: 180 },
      { season: "24/25", value: 200 },
    ],
  
    lastGames: [
      { opponent: "Liverpool", rating: 7.8 },
      { opponent: "Arsenal", rating: 7.2 },
      { opponent: "Chelsea", rating: 8.4 },
      { opponent: "Newcastle", rating: 8.0 },
      { opponent: "Spurs", rating: 7.6 },
    ],
  },
  {
    name: "Morgan Rogers",
    slug: "morgan-rogers",
    age: 23,
    position: "LW",
    role: "attacker",
    club: "AVL",
    country: "ENG",
    image: "/players/rogers.png",
    apps: 115,
    goals: 24,
    assists: 18,
    rating: 7.2,
    minutes: 8200,
  
    fifaStats: {
      PAC: 84,
      SHO: 78,
      PAS: 76,
      DRI: 82,
      DEF: 39,
      PHY: 73,
    },
  
    radarStats: [
      { stat: "Touches", value: 68 },
      { stat: "Shot attempts", value: 77 },
      { stat: "Goal threat", value: 73 },
      { stat: "Chances created", value: 66 },
      { stat: "Aerial duels", value: 25 },
      { stat: "Defensive", value: 40 },
    ],
  
    compareStats: {
      touches: 68,
      shotAttempts: 77,
      goalThreat: 73,
      chancesCreated: 66,
      aerialDuelsWon: 25,
      defensiveContributions: 40,
  
      passing: 76,
      ballWinning: 48,
      keyPasses: 71,
      dribbles: 81,
      passAccuracy: 80,
      progressivePasses: 74,
  
      tackles: 22,
      interceptions: 14,
      clearances: 9,
      blocks: 3,
      recoveries: 24,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 8 },
      { season: "23/24", value: 22 },
      { season: "24/25", value: 45 },
    ],
  
    lastGames: [
      { opponent: "Arsenal", rating: 7.4 },
      { opponent: "Chelsea", rating: 7.0 },
      { opponent: "Liverpool", rating: 7.7 },
      { opponent: "Spurs", rating: 7.5 },
      { opponent: "Newcastle", rating: 7.8 },
    ],
  },
  
  {
    name: "Bruno Fernandes",
    slug: "bruno-fernandes",
    age: 30,
    position: "CAM",
    role: "midfielder",
    club: "MUN",
    country: "POR",
    image: "/players/bruno.png",
    apps: 310,
    goals: 95,
    assists: 88,
    rating: 7.8,
    minutes: 24000,
  
    fifaStats: {
      PAC: 75,
      SHO: 84,
      PAS: 91,
      DRI: 84,
      DEF: 66,
      PHY: 76,
    },
  
    radarStats: [
      { stat: "Touches", value: 85 },
      { stat: "Passing", value: 91 },
      { stat: "Chances created", value: 94 },
      { stat: "Ball winning", value: 62 },
      { stat: "Aerial duels", value: 22 },
      { stat: "Goal threat", value: 81 },
    ],
  
    compareStats: {
      touches: 85,
      shotAttempts: 78,
      goalThreat: 81,
      chancesCreated: 94,
      aerialDuelsWon: 22,
      defensiveContributions: 58,
  
      passing: 91,
      ballWinning: 62,
      keyPasses: 95,
      dribbles: 79,
      passAccuracy: 87,
      progressivePasses: 90,
  
      tackles: 44,
      interceptions: 38,
      clearances: 18,
      blocks: 8,
      recoveries: 52,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 85 },
      { season: "23/24", value: 70 },
      { season: "24/25", value: 65 },
    ],
  
    lastGames: [
      { opponent: "Chelsea", rating: 8.0 },
      { opponent: "Liverpool", rating: 7.2 },
      { opponent: "Arsenal", rating: 7.6 },
      { opponent: "Villa", rating: 7.8 },
      { opponent: "Brighton", rating: 8.1 },
    ],
  },
  
  {
    name: "Declan Rice",
    slug: "declan-rice",
    age: 26,
    position: "CDM",
    role: "midfielder",
    club: "ARS",
    country: "ENG",
    image: "/players/rice.png",
    apps: 290,
    goals: 22,
    assists: 20,
    rating: 7.6,
    minutes: 23000,
  
    fifaStats: {
      PAC: 77,
      SHO: 72,
      PAS: 84,
      DRI: 79,
      DEF: 86,
      PHY: 85,
    },
  
    radarStats: [
      { stat: "Touches", value: 91 },
      { stat: "Passing", value: 88 },
      { stat: "Chances created", value: 70 },
      { stat: "Ball winning", value: 90 },
      { stat: "Aerial duels", value: 74 },
      { stat: "Goal threat", value: 55 },
    ],
  
    compareStats: {
      touches: 91,
      shotAttempts: 48,
      goalThreat: 55,
      chancesCreated: 70,
      aerialDuelsWon: 74,
      defensiveContributions: 90,
  
      passing: 88,
      ballWinning: 90,
      keyPasses: 66,
      dribbles: 70,
      passAccuracy: 90,
      progressivePasses: 84,
  
      tackles: 82,
      interceptions: 85,
      clearances: 68,
      blocks: 22,
      recoveries: 92,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 70 },
      { season: "23/24", value: 95 },
      { season: "24/25", value: 110 },
    ],
  
    lastGames: [
      { opponent: "Chelsea", rating: 7.9 },
      { opponent: "Liverpool", rating: 8.1 },
      { opponent: "Spurs", rating: 7.8 },
      { opponent: "Villa", rating: 7.5 },
      { opponent: "Man City", rating: 7.7 },
    ],
  },
  
  {
    name: "Moises Caicedo",
    slug: "moises-caicedo",
    age: 23,
    position: "CDM",
    role: "midfielder",
    club: "CHE",
    country: "ECU",
    image: "/players/caicedo.png",
    apps: 180,
    goals: 9,
    assists: 14,
    rating: 7.4,
    minutes: 14000,
  
    fifaStats: {
      PAC: 79,
      SHO: 68,
      PAS: 82,
      DRI: 80,
      DEF: 84,
      PHY: 82,
    },
  
    radarStats: [
      { stat: "Touches", value: 88 },
      { stat: "Passing", value: 84 },
      { stat: "Chances created", value: 65 },
      { stat: "Ball winning", value: 92 },
      { stat: "Aerial duels", value: 69 },
      { stat: "Goal threat", value: 42 },
    ],
  
    compareStats: {
      touches: 88,
      shotAttempts: 36,
      goalThreat: 42,
      chancesCreated: 65,
      aerialDuelsWon: 69,
      defensiveContributions: 91,
  
      passing: 84,
      ballWinning: 92,
      keyPasses: 58,
      dribbles: 74,
      passAccuracy: 89,
      progressivePasses: 78,
  
      tackles: 88,
      interceptions: 84,
      clearances: 61,
      blocks: 18,
      recoveries: 94,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 12 },
      { season: "23/24", value: 60 },
      { season: "24/25", value: 80 },
    ],
  
    lastGames: [
      { opponent: "Arsenal", rating: 7.5 },
      { opponent: "Liverpool", rating: 7.8 },
      { opponent: "Spurs", rating: 7.1 },
      { opponent: "Villa", rating: 7.6 },
      { opponent: "Newcastle", rating: 7.7 },
    ],
  },
  {
    name: "Virgil Van Dijk",
    slug: "virgil-van-dijk",
    age: 34,
    position: "CB",
    role: "defender",
    club: "LIV",
    country: "NED",
    image: "/players/vvd.png",
    apps: 301,
    goals: 24,
    assists: 9,
    rating: 7.5,
    minutes: 24870,
  
    fifaStats: {
      PAC: 79,
      SHO: 60,
      PAS: 78,
      DRI: 72,
      DEF: 91,
      PHY: 89,
    },
  
    radarStats: [
      { stat: "Tackles", value: 72 },
      { stat: "Interceptions", value: 75 },
      { stat: "Aerial duels", value: 95 },
      { stat: "Clearances", value: 88 },
      { stat: "Passing", value: 84 },
      { stat: "Defensive", value: 91 },
    ],
  
    compareStats: {
      touches: 84,
      shotAttempts: 22,
      goalThreat: 34,
      chancesCreated: 18,
      aerialDuelsWon: 95,
      defensiveContributions: 91,
  
      passing: 84,
      ballWinning: 89,
      keyPasses: 24,
      dribbles: 58,
      passAccuracy: 89,
      progressivePasses: 76,
  
      tackles: 72,
      interceptions: 75,
      clearances: 88,
      blocks: 67,
      recoveries: 83,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 55 },
      { season: "23/24", value: 45 },
      { season: "24/25", value: 35 },
    ],
  
    lastGames: [
      { opponent: "Arsenal", rating: 8.4 },
      { opponent: "Chelsea", rating: 7.8 },
      { opponent: "Spurs", rating: 8.1 },
      { opponent: "Man City", rating: 7.7 },
      { opponent: "Villa", rating: 7.9 },
    ],
  },
  
  {
    name: "Reece James",
    slug: "reece-james",
    age: 25,
    position: "RB",
    role: "defender",
    club: "CHE",
    country: "ENG",
    image: "/players/reece_james.png",
    apps: 170,
    goals: 16,
    assists: 28,
    rating: 7.3,
    minutes: 12800,
  
    fifaStats: {
      PAC: 83,
      SHO: 74,
      PAS: 82,
      DRI: 79,
      DEF: 81,
      PHY: 84,
    },
  
    radarStats: [
      { stat: "Tackles", value: 80 },
      { stat: "Interceptions", value: 74 },
      { stat: "Aerial duels", value: 62 },
      { stat: "Clearances", value: 68 },
      { stat: "Passing", value: 85 },
      { stat: "Defensive", value: 82 },
    ],
  
    compareStats: {
      touches: 78,
      shotAttempts: 30,
      goalThreat: 42,
      chancesCreated: 70,
      aerialDuelsWon: 62,
      defensiveContributions: 82,
  
      passing: 85,
      ballWinning: 81,
      keyPasses: 74,
      dribbles: 72,
      passAccuracy: 87,
      progressivePasses: 79,
  
      tackles: 80,
      interceptions: 74,
      clearances: 68,
      blocks: 55,
      recoveries: 79,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 65 },
      { season: "23/24", value: 55 },
      { season: "24/25", value: 50 },
    ],
  
    lastGames: [
      { opponent: "Liverpool", rating: 7.2 },
      { opponent: "Arsenal", rating: 7.6 },
      { opponent: "Spurs", rating: 7.4 },
      { opponent: "Villa", rating: 7.1 },
      { opponent: "Newcastle", rating: 7.7 },
    ],
  },
  
  {
    name: "Marc Cucurella",
    slug: "marc-cucurella",
    age: 26,
    position: "LB",
    role: "defender",
    club: "CHE",
    country: "ESP",
    image: "/players/cucurella.png",
    apps: 200,
    goals: 8,
    assists: 19,
    rating: 7.1,
    minutes: 15000,
  
    fifaStats: {
      PAC: 80,
      SHO: 66,
      PAS: 78,
      DRI: 77,
      DEF: 82,
      PHY: 76,
    },
  
    radarStats: [
      { stat: "Tackles", value: 84 },
      { stat: "Interceptions", value: 78 },
      { stat: "Aerial duels", value: 58 },
      { stat: "Clearances", value: 72 },
      { stat: "Passing", value: 81 },
      { stat: "Defensive", value: 85 },
    ],
  
    compareStats: {
      touches: 81,
      shotAttempts: 24,
      goalThreat: 31,
      chancesCreated: 54,
      aerialDuelsWon: 58,
      defensiveContributions: 85,
  
      passing: 81,
      ballWinning: 84,
      keyPasses: 56,
      dribbles: 68,
      passAccuracy: 85,
      progressivePasses: 75,
  
      tackles: 84,
      interceptions: 78,
      clearances: 72,
      blocks: 52,
      recoveries: 82,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 40 },
      { season: "23/24", value: 35 },
      { season: "24/25", value: 32 },
    ],
  
    lastGames: [
      { opponent: "Arsenal", rating: 7.1 },
      { opponent: "Liverpool", rating: 7.4 },
      { opponent: "Spurs", rating: 7.0 },
      { opponent: "Villa", rating: 7.3 },
      { opponent: "Brighton", rating: 7.8 },
    ],
  },
  
  {
    name: "Gianluigi Donnarumma",
    slug: "gianluigi-donnarumma",
    age: 27,
    position: "GK",
    role: "goalkeeper",
    club: "PSG",
    country: "ITA",
    image: "/players/donnarumma.png",
    apps: 280,
    goals: 0,
    assists: 0,
    rating: 7.2,
    minutes: 23400,
  
    fifaStats: {
      PAC: 45,
      SHO: 20,
      PAS: 68,
      DRI: 35,
      DEF: 25,
      PHY: 82,
    },
  
    radarStats: [
      { stat: "Saves", value: 86 },
      { stat: "Claims", value: 73 },
      { stat: "Distribution", value: 68 },
      { stat: "Reflexes", value: 91 },
      { stat: "1v1", value: 84 },
      { stat: "Aerial Cmd", value: 78 },
    ],
  
    compareStats: {
      touches: 42,
      shotAttempts: 0,
      goalThreat: 0,
      chancesCreated: 2,
      aerialDuelsWon: 16,
      defensiveContributions: 88,
  
      passing: 68,
      ballWinning: 12,
      keyPasses: 1,
      dribbles: 10,
      passAccuracy: 78,
      progressivePasses: 55,
  
      tackles: 1,
      interceptions: 2,
      clearances: 10,
      blocks: 0,
      recoveries: 22,
  
      saves: 86,
      claims: 73,
      distribution: 68,
      reflexes: 91,
      oneVsOne: 84,
      aerialCommand: 78,
      cleanSheets: 108,
      savePercentage: 77,
      longPassAccuracy: 63,
    },
  
    transferValues: [
      { season: "22/23", value: 55 },
      { season: "23/24", value: 50 },
      { season: "24/25", value: 45 },
    ],
  
    lastGames: [
      { opponent: "Marseille", rating: 7.8 },
      { opponent: "Monaco", rating: 7.5 },
      { opponent: "Lyon", rating: 8.1 },
      { opponent: "Nice", rating: 7.2 },
      { opponent: "Lille", rating: 7.6 },
    ],
  },
  
  {
    name: "David Raya",
    slug: "david-raya",
    age: 29,
    position: "GK",
    role: "goalkeeper",
    club: "ARS",
    country: "ESP",
    image: "/players/raya.png",
    apps: 215,
    goals: 0,
    assists: 1,
    rating: 7.3,
    minutes: 18210,
  
    fifaStats: {
      PAC: 48,
      SHO: 22,
      PAS: 82,
      DRI: 40,
      DEF: 24,
      PHY: 76,
    },
  
    radarStats: [
      { stat: "Saves", value: 81 },
      { stat: "Claims", value: 77 },
      { stat: "Distribution", value: 88 },
      { stat: "Reflexes", value: 84 },
      { stat: "1v1", value: 79 },
      { stat: "Aerial Cmd", value: 74 },
    ],
  
    compareStats: {
      touches: 48,
      shotAttempts: 0,
      goalThreat: 0,
      chancesCreated: 4,
      aerialDuelsWon: 12,
      defensiveContributions: 84,
  
      passing: 82,
      ballWinning: 10,
      keyPasses: 2,
      dribbles: 12,
      passAccuracy: 86,
      progressivePasses: 74,
  
      tackles: 1,
      interceptions: 1,
      clearances: 12,
      blocks: 0,
      recoveries: 18,
  
      saves: 81,
      claims: 77,
      distribution: 88,
      reflexes: 84,
      oneVsOne: 79,
      aerialCommand: 74,
      cleanSheets: 83,
      savePercentage: 74,
      longPassAccuracy: 81,
    },
  
    transferValues: [
      { season: "22/23", value: 12 },
      { season: "23/24", value: 25 },
      { season: "24/25", value: 32 },
    ],
  
    lastGames: [
      { opponent: "Chelsea", rating: 7.4 },
      { opponent: "Liverpool", rating: 7.8 },
      { opponent: "Spurs", rating: 7.2 },
      { opponent: "Villa", rating: 7.7 },
      { opponent: "Man City", rating: 7.3 },
    ],
  },
  {
    name: "Harry Kane",
    slug: "harry-kane",
    age: 31,
    position: "ST",
    role: "attacker",
    club: "FCB",
    country: "ENG",
    image: "/players/harry_kane.png",
  
    apps: 28,
    goals: 27,
    assists: 8,
    rating: 7.94,
    minutes: 2430,
  
    fifaStats: {
      PAC: 72,
      SHO: 94,
      PAS: 84,
      DRI: 83,
      DEF: 48,
      PHY: 82,
    },
  
    radarStats: [
      { stat: "Shot attempts", value: 96 },
      { stat: "Goals", value: 98 },
      { stat: "Conversion", value: 91 },
      { stat: "Touches in box", value: 89 },
      { stat: "Chances created", value: 77 },
      { stat: "Dribbles", value: 62 },
    ],
  
    compareStats: {
      touches: 78,
      shotAttempts: 96,
      goalThreat: 98,
      chancesCreated: 77,
      aerialDuelsWon: 84,
      defensiveContributions: 28,
  
      passing: 84,
      ballWinning: 38,
      keyPasses: 80,
      dribbles: 62,
      passAccuracy: 86,
      progressivePasses: 74,
  
      tackles: 12,
      interceptions: 8,
      clearances: 9,
      blocks: 3,
      recoveries: 22,
  
      saves: 0,
      claims: 0,
      distribution: 0,
      reflexes: 0,
      oneVsOne: 0,
      aerialCommand: 0,
      cleanSheets: 0,
      savePercentage: 0,
      longPassAccuracy: 0,
    },
  
    transferValues: [
      { season: "22/23", value: 90 },
      { season: "23/24", value: 95 },
      { season: "24/25", value: 88 },
    ],
  
    lastGames: [
      { opponent: "Dortmund", rating: 8.5 },
      { opponent: "Leverkusen", rating: 7.8 },
      { opponent: "Leipzig", rating: 8.1 },
      { opponent: "Stuttgart", rating: 7.4 },
      { opponent: "Frankfurt", rating: 8.7 },
    ],
  },
]

async function main() {
  for (const player of players) {
    await prisma.player.upsert({
      where: { slug: player.slug },
      update: player,
      create: player,
    })

    console.log(`${player.name} seeded`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })