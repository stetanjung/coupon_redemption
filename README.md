# Coupon Redemption
## Overview
This repository contains the source code and configuration files for the Coupon Redemption service. 
Coupon Redemption has 2 different interfaces:
- admin panel to manage the coupon as create, delete, and view the coupons
- public facing interface for the user redeem

This service can be easily deployed using Docker.

## Prerequisites
Before you begin, ensure that you have the following installed on your machine:

- Docker

## Getting Started
Follow these steps to deploy Coupon Redemption using Docker Compose:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/service-name.git
```

2. Navigate to the project directory:

```bash
cd coupon_redemtion
```

3. Build and start the Docker containers using Docker Compose:

```bash
docker-compose up --build -d
```
This command will pull the necessary Docker images, build the service, and start it in detached mode.

4. Access Coupon Redemption at:
    1. Admin: `http://localhost:8080`
    2. Public: `http://localhost:8081`

## Maintenance
To stop the service, run:

```bash
docker-compose down
```
This will stop and remove the containers, networks, and volumes defined in the docker-compose.yml file.

Contact
For questions or support, please contact [stephen.tanjung@gmail.com].
