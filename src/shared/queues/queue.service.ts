import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('user-queue') private userQueue: Queue) {}

  async addJob(queueName: string, jobName: string, data: any): Promise<void> {
    // Add a job to the specified queue
    const queue = this.getQueueByName(queueName);
    if (queue) {
      await queue.add(jobName, data);

      // Log para depuração
      console.log('Job adicionado à fila:', queueName, jobName, data);
    } else {
      // Log para depuração
      console.error('Fila não encontrada:', queueName);
    }
  }

  async getJobStatus(queueName: string, jobId: string): Promise<any> {
    // Get the status of a job by its ID
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

  private getQueueByName(queueName: string): Queue {
    // Retrieve the queue by its name
    if (queueName === 'user-queue') {
      return this.userQueue;
    }
    return null;
  }
}
