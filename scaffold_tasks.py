import os
import urllib.request
import zipfile
import shutil

base_dir = r"c:\Users\pavul\OneDrive\Desktop\full stack tasks"

tasks = [
    {
        "dir": "Task 14 Microservices",
        "projects": [
            {"name": "order-service", "deps": "web,data-jpa,mysql"},
            {"name": "inventory-service", "deps": "web,data-jpa,mysql"}
        ]
    },
    {
        "dir": "Task 15 Eureka Server",
        "projects": [
            {"name": "eureka-server", "deps": "cloud-eureka-server"}
        ]
    },
    {
        "dir": "Task 16 API Gateway",
        "projects": [
            {"name": "api-gateway", "deps": "cloud-gateway"}
        ]
    },
    {
        "dir": "Task 17 Inter-Service Communication",
        "projects": [
            {"name": "service-a", "deps": "web,cloud-eureka,cloud-feign"},
            {"name": "service-b", "deps": "web,cloud-eureka"}
        ]
    },
    {
        "dir": "Task 18 Unit Testing",
        "projects": [
            {"name": "testing-demo", "deps": "web,data-jpa,mysql"}
        ]
    }
]

def download_spring_boot(folder, name, deps):
    url = f"https://start.spring.io/starter.zip?type=maven-project&language=java&baseDir={name}&groupId=com.example&artifactId={name}&name={name}&javaVersion=17&dependencies={deps}"
    zip_path = os.path.join(folder, f"{name}.zip")
    urllib.request.urlretrieve(url, zip_path)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(folder)
    os.remove(zip_path)

for task in tasks:
    task_dir = os.path.join(base_dir, task["dir"])
    os.makedirs(task_dir, exist_ok=True)
    for proj in task["projects"]:
        download_spring_boot(task_dir, proj["name"], proj["deps"])
        
# For Tasks 19 to 24, just create folders and READMEs
doc_tasks = [
    ("Task 19 Git Repository", "# Task 19: Git Repository\n\nRun:\n```bash\ngit init\ngit add .\ngit commit -m \"Initial commit\"\ngit remote add origin <url>\ngit push -u origin main\n```"),
    ("Task 20 Git Branching", "# Task 20: Git Branching\n\nCommands:\n```bash\ngit checkout -b feature-1\n# make changes\ngit commit -m \"Feature 1\"\ngit checkout main\ngit merge feature-1\n```"),
    ("Task 21 CI CD Pipeline", "# Task 21: CI/CD Pipeline\n\nExample GitHub Actions workflow in `.github/workflows/main.yml`"),
    ("Task 22 Cloud Service Providers", "# Task 22: Cloud Service Providers\n\nAWS vs GCP vs Azure..."),
    ("Task 23 Vibe Coding 1", "# Task 23: Vibe Coding\n\nPrompts used to generate basic cloud architecture..."),
    ("Task 24 Vibe Coding 2", "# Task 24: Vibe Coding 2\n\nIterative prompting for advanced features...")
]

for title, content in doc_tasks:
    t_dir = os.path.join(base_dir, title)
    os.makedirs(t_dir, exist_ok=True)
    with open(os.path.join(t_dir, "README.md"), "w") as f:
        f.write(content)

print("Scaffolding completed!")
