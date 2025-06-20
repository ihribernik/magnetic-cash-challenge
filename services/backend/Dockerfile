FROM python:3.13-slim as base
FROM base as builder

# Allows docker to cache installed dependencies between builds
RUN apt-get update && apt-get -y install libpq-dev gcc default-libmysqlclient-dev build-essential pkg-config
COPY ./requirements.txt requirements.txt
RUN pip3 install --no-cache-dir --target=packages -r requirements.txt

FROM base as runtime
RUN apt-get update && apt-get -y install libmariadb3
COPY --from=builder packages /usr/lib/python3.13/site-packages
ENV PYTHONPATH=/usr/lib/python3.13/site-packages

# Security Context
RUN useradd -m nonroot
USER nonroot

COPY . /code
WORKDIR /code

EXPOSE 8000
# Run the production server
CMD gunicorn --bind 0.0.0.0:$PORT --access-logfile - backend.wsgi:application
