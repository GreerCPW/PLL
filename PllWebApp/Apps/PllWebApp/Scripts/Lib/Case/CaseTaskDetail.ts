

export class CaseTaskDetail {
    constructor(private readonly taskDetail: ICaseTaskDetailModel) {
    }

    get task() { return this.taskDetail.Task; }

    get result() { return this.taskDetail.Results.find(r => r.ID === this.taskDetail.Task.ResultID); }

    get results() { return this.taskDetail.Results; }
}