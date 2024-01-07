# Coupon Redemption

## Overview

This repository contains the source code and configuration files for the Coupon Redemption service which require a valid HKID.
Coupon Redemption has 2 different interfaces:

-   admin panel to manage the coupon as create, delete, and view the coupons
-   public facing interface for the user redeem

This service can be easily deployed using Docker.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

-   Docker

## Getting Started

Follow these steps to deploy Coupon Redemption using Docker Compose:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/stetanjung/coupon_redemption.git
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

## API

### Admin related API

1. Login to get the access token

```
curl --location 'localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin",
    "password": "root"
}'
```

2. Create a new coupon

```
curl --location 'localhost:3000/coupon' \
--header 'Authorization: Bearer {based on the response of #1}' \
--header 'Content-Type: application/json' \
--data '{
    "couponCode": "EVER1",
    "couponName": "evercare $50",
    "quota": 2,
    "startDate": "2024-01-04",
    "endDate": "2024-02-01"
}'
```

3. Create bulk coupon (no interface for this)
```
curl --location 'localhost:3000/coupon/bulk' \
--header 'Authorization: Bearer {based on the response of #1}' \
--header 'Content-Type: application/json' \
--data '[
    {
        "couponCode": "EVER2",
        "couponName": "evercare $100",
        "quota": 10,
        "startDate": "2024-01-05",
        "endDate": "2024-01-08"
    },
    {
        "couponCode": "EVER3",
        "couponName": "evercare $150",
        "quota": 3,
        "startDate": "2024-01-03",
        "endDate": "2024-02-01"
    }
]'
```

4. Get all coupon
```
curl --location 'localhost:3000/coupon' \
--header 'Authorization: Bearer {based on the response of #1}'
```

5. Delete coupon
```
curl --location --request DELETE 'localhost:3000/coupon/{couponCode}'
--header 'Authorization: Bearer {based on the response of #1}'
```

### Redemption related API
1. Redeem
```
curl --location 'localhost:3000/redemption' \
--header 'Content-Type: application/json' \
--data '{
    "hkid": "{HKID}",
    "couponCode": "{couponCode}"
}'
```
