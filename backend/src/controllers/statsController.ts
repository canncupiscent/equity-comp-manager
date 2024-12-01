import { Request, Response } from 'express';
import { pool } from '../db';

export const statsController = {
  async getCompanyStats(req: Request, res: Response) {
    try {
      // Get total companies and month-over-month change
      const result = await pool.query(`
        WITH monthly_counts AS (
          SELECT 
            DATE_TRUNC('month', created_at) as month,
            COUNT(*) as count
          FROM companies
          WHERE created_at >= NOW() - INTERVAL '2 months'
          GROUP BY DATE_TRUNC('month', created_at)
        )
        SELECT 
          (SELECT COUNT(*) FROM companies) as total,
          COALESCE(
            (
              SELECT cur.count - prev.count
              FROM monthly_counts cur
              LEFT JOIN monthly_counts prev 
                ON prev.month = cur.month - INTERVAL '1 month'
              WHERE cur.month = DATE_TRUNC('month', NOW())
            ),
            0
          ) as change;
      `);
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch company stats' });
    }
  },

  async getEmployeeStats(req: Request, res: Response) {
    try {
      // Get active employees and month-over-month change
      const result = await pool.query(`
        WITH monthly_counts AS (
          SELECT 
            DATE_TRUNC('month', hire_date) as month,
            COUNT(*) as count
          FROM employees
          WHERE employment_status = 'Active'
          AND hire_date >= NOW() - INTERVAL '2 months'
          GROUP BY DATE_TRUNC('month', hire_date)
        )
        SELECT 
          (
            SELECT COUNT(*) 
            FROM employees 
            WHERE employment_status = 'Active'
          ) as active,
          COALESCE(
            (
              SELECT cur.count - prev.count
              FROM monthly_counts cur
              LEFT JOIN monthly_counts prev 
                ON prev.month = cur.month - INTERVAL '1 month'
              WHERE cur.month = DATE_TRUNC('month', NOW())
            ),
            0
          ) as change;
      `);
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch employee stats' });
    }
  },

  async getGrantStats(req: Request, res: Response) {
    try {
      // Get active grants and month-over-month change
      const result = await pool.query(`
        WITH monthly_counts AS (
          SELECT 
            DATE_TRUNC('month', grant_date) as month,
            COUNT(*) as count
          FROM equity_grants
          WHERE grant_date >= NOW() - INTERVAL '2 months'
          GROUP BY DATE_TRUNC('month', grant_date)
        )
        SELECT 
          (SELECT COUNT(*) FROM equity_grants) as active,
          COALESCE(
            (
              SELECT cur.count - prev.count
              FROM monthly_counts cur
              LEFT JOIN monthly_counts prev 
                ON prev.month = cur.month - INTERVAL '1 month'
              WHERE cur.month = DATE_TRUNC('month', NOW())
            ),
            0
          ) as change;
      `);
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch grant stats' });
    }
  },

  async getVestingEvents(req: Request, res: Response) {
    try {
      // Get upcoming vesting events for the next 30 days
      const result = await pool.query(`
        WITH upcoming_events AS (
          SELECT 
            vs.vesting_start_date + 
            MAKE_INTERVAL(months := 
              FLOOR(
                EXTRACT(epoch FROM NOW() - vs.vesting_start_date) / 
                (30 * 24 * 60 * 60)
              )::integer
            ) as next_vest_date,
            eg.shares_granted * 
              (1.0 / (vs.total_period_months::float / vs.vesting_frequency::integer)) 
              as shares_vesting,
            e.full_name as employee_name,
            e.employee_id
          FROM vesting_schedules vs
          JOIN equity_grants eg ON vs.grant_id = eg.grant_id
          JOIN employees e ON eg.employee_id = e.employee_id
          WHERE vs.vesting_start_date <= NOW()
          AND vs.vesting_start_date + MAKE_INTERVAL(months := vs.total_period_months) > NOW()
        )
        SELECT 
          COUNT(*) as pending,
          json_agg(
            json_build_object(
              'date', next_vest_date,
              'shares', shares_vesting,
              'employeeName', employee_name
            )
            ORDER BY next_vest_date
            LIMIT 5
          ) as nextEvent
        FROM upcoming_events
        WHERE next_vest_date <= NOW() + INTERVAL '30 days';
      `);
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch vesting events' });
    }
  }
};
