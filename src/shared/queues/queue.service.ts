import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('user-queue') private userQueue: Queue) {}

  // Add a job to the specified queue
  async addJob(queueName: string, jobName: string, data: any): Promise<void> {
    const queue = this.getQueueByName(queueName);
    if (queue) {
      await queue.add(jobName, data);
      console.log('Job added to queue:', queueName, jobName, data);
    } else {
      console.error('Queue not found:', queueName);
    }
  }

  // Get the status of a job by its ID
  async getJobStatus(queueName: string, jobId: string): Promise<any> {
    const queue = this.getQueueByName(queueName);
    if (queue) {
      const job = await queue.getJob(jobId);
      if (job) {
        return {
          id: job.id,
          state: await job.getState(),
          progress: job.progress(),
          attemptsMade: job.attemptsMade,
          failedReason: job.failedReason,
          returnValue: job.returnvalue,
        };
      }
    }
    return null;
  }

  // Retrieve the queue by its name
  private getQueueByName(queueName: string): Queue | null {
    if (queueName === 'user-queue') {
      return this.userQueue;
    }
    return null;
  }
}
