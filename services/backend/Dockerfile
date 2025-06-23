FROM python:3.13-slim AS base

FROM base AS builder
RUN apt-get update && apt-get -y install gcc default-libmysqlclient-dev build-essential pkg-config
COPY ./requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

FROM base AS runtime
RUN apt-get update && apt-get -y install libmariadb3
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . /code
WORKDIR /code

RUN useradd -m nonroot
USER nonroot

EXPOSE 8000
CMD gunicorn --bind 0.0.0.0:$PORT --timeout 60 --access-logfile - backend.wsgi:application