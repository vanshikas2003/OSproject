class Process {
    constructor(pid, tickets) {
        this.pid = pid; // Process ID
        this.tickets = tickets; // Number of tickets
        this.executionTime = 0; // Total execution time for the process
    }
}

class LotteryScheduler {
    constructor() {
        this.processes = [];
        this.totalTickets = 0;
    }

    addProcess(process) {
        this.processes.push(process);
        this.totalTickets += process.tickets;
    }

    run(totalTimeSlices) {
        let outputBody = document.querySelector("#output tbody");
        outputBody.innerHTML = "";
        let executionLog = [];

        for (let t = 0; t < totalTimeSlices; t++) {
            if (this.totalTickets === 0) {
                console.log("No processes to schedule.");
                return;
            }

            let winningTicket = Math.floor(Math.random() * this.totalTickets) + 1;
            let currentTicket = 0;

            for (let process of this.processes) {
                currentTicket += process.tickets;
                if (currentTicket >= winningTicket) {
                    this.executeProcess(process);
                    executionLog.push(process.pid);
                    break;
                }
            }
        }

        this.displayResults();
        this.displayGanttChart(executionLog);
    }

    executeProcess(process) {
        process.executionTime += 1;
    }

    displayResults() {
        let outputBody = document.querySelector("#output tbody");
        for (let process of this.processes) {
            let row = outputBody.insertRow();
            row.insertCell(0).textContent = process.pid;
            row.insertCell(1).textContent = process.tickets;
            row.insertCell(2).textContent = process.executionTime;
        }
    }

    displayGanttChart(executionLog) {
        let gantt = document.getElementById("gantt");
        gantt.innerHTML = "";
        gantt.style.display = "flex";
        gantt.style.flexDirection = "row";

        executionLog.forEach(pid => {
            let block = document.createElement("div");
            block.textContent = pid;
            block.style.border = "1px solid black";
            block.style.padding = "10px";
            block.style.margin = "2px";
            block.style.flex = "1";
            gantt.appendChild(block);
        });

        document.getElementById("chart-header").textContent = "Gantt Chart";
    }
}

function schedule() {
    let scheduler = new LotteryScheduler();

    for (let i = 1; i <= 5; i++) {
        let pid = document.getElementById(`pid${i}`).value;
        let tickets = parseInt(document.getElementById(`tickets${i}`).value);

        if (pid && tickets > 0) {
            scheduler.addProcess(new Process(pid, tickets));
        }
    }

    scheduler.run(10);
}
