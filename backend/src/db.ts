{
    "content": "import { Pool } from 'pg';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\nexport const pool = new Pool({\n  user: process.env.DB_USER,\n  host: process.env.DB_HOST,\n  database: 'equity_comp',\n  password: process.env.DB_PASSWORD,\n  port: parseInt(process.env.DB_PORT || '5432'),\n});",
    "encoding": "utf-8"
}