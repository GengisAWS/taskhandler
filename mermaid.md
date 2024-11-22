::: mermaid
graph TD
    A[Start Empty VSCode Project] --> B[Create Design Document]
    B -->|Using /dev| C[Generate app.md]
    C -->|Refine with Inline Chat| D[Finalize Design]
    
    D --> E[Infrastructure Development]
    E -->|/dev @workspace| F[Generate CDK Code]
    F --> G[Generate README.md]
    G --> H[Fix Missing Files]
    H -->|cdk.json| I[Deploy Infrastructure]
    
    D --> J[Frontend Development]
    J -->|/dev @workspace| K[Generate React Frontend]
    K --> L[Fix Missing Files]
    L -->|index.html| M[Local Deployment]
    M --> N[CloudFront Deployment]
    N -->|Update CDK| O[Fix CORS Issues]
    
    P[Documentation Phase]
    I --> P
    O --> P
    P -->|Inline Chat| Q[Generate Code Comments]
    P -->|/dev| R[Generate Infrastructure Diagram]
    
    style A fill:#f9f,stroke:#333
    style P fill:#bbf,stroke:#333
   :::