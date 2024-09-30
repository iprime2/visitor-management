import { Logger } from '@nestjs/common';
import { CronJob, CronTime } from 'cron';

export abstract class CronJobManager {
  protected readonly logger = new Logger(CronJobManager.name);
  private cronJobs: Map<string, CronJob> = new Map(); // Store cron jobs

  /**
   * Validates a cron expression using CronTime from 'cron'.
   * @param schedule The cron schedule string to validate.
   * @returns Whether the cron expression is valid.
   */
  validateCronExpression(schedule: string): boolean {
    try {
      // Use CronTime to check if the expression is valid
      new CronTime(schedule);
      return true;
    } catch (error) {
      this.logger.warn(`Invalid cron expression: ${schedule}. Error: ${error.message}`);
      return false;
    }
  }

  /**
   * Creates a new cron job.
   * @param name The name of the cron job.
   * @param schedule The cron schedule string (e.g. '* * * * *').
   * @param task The function to run on schedule.
   */
  createCronJob(name: string, schedule: string, task: () => void): void {
    try {
      // Validate cron expression
      if (!this.validateCronExpression(schedule)) {
        this.logger.error(`Invalid cron expression: ${schedule}`);
        return;
      }

      // Check if cron job with the same name already exists
      if (this.cronJobs.has(name)) {
        this.logger.warn(`Cron job '${name}' already exists.`);
        return;
      }

      // Create a new cron job using the 'cron' library
      const cronJob = new CronJob(schedule, () => {
        try {
          this.logger.log(`Cron job '${name}' is executing.`);
          task(); // Execute the task
        } catch (taskError) {
          this.logger.error(`Error executing cron job '${name}': ${taskError}`);
        }
      });

      // Save the cron job in the map and start it
      this.cronJobs.set(name, cronJob);
      cronJob.start();

      this.logger.log(`Cron job '${name}' created with schedule '${schedule}'.`);
    } catch (error) {
      this.logger.error(`Error creating cron job '${name}': ${error}`);
    }
  }

  /**
   * Deletes an existing cron job.
   * @param name The name of the cron job to delete.
   */
  deleteCronJob(name: string): void {
    try {
      const cronJob = this.cronJobs.get(name);

      if (!cronJob) {
        this.logger.warn(`Cron job '${name}' does not exist.`);
        return;
      }

      // Stop the cron job and remove it from the map
      cronJob.stop();
      this.cronJobs.delete(name);
      this.logger.log(`Cron job '${name}' has been deleted.`);
    } catch (error) {
      this.logger.error(`Error deleting cron job '${name}': ${error}`);
    }
  }

  /**
   * Lists all active cron jobs.
   */
  listCronJobs(): void {
    try {
      const jobNames = Array.from(this.cronJobs.keys());
      this.logger.log(`Active cron jobs: ${jobNames.length ? jobNames.join(', ') : 'None'}`);
    } catch (error) {
      this.logger.error(`Error listing cron jobs: ${error}`);
    }
  }

  /**
   * Checks if a cron job is running.
   * @param name The name of the cron job.
   * @returns Whether the cron job is running.
   */
  isCronJobRunning(name: string): boolean {
    try {
      const cronJob = this.cronJobs.get(name);
      if (!cronJob) {
        this.logger.warn(`Cron job '${name}' does not exist.`);
        return false;
      }

      // The 'running' state is tracked internally in the CronJob instance
      return cronJob.running;
    } catch (error) {
      this.logger.error(`Error checking if cron job '${name}' is running: ${error}`);
      return false;
    }
  }
}
