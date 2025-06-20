import os
import logging
from time import time, sleep
import MySQLdb

check_timeout = int(os.getenv("MYSQL_CHECK_TIMEOUT", 30))
check_interval = int(os.getenv("MYSQL_CHECK_INTERVAL", 1))
interval_unit = "second" if check_interval == 1 else "seconds"
config = {
    "db": os.getenv("MYSQL_DATABASE", "app_db"),
    "user": os.getenv("MYSQL_USER", "root"),
    "passwd": os.getenv("MYSQL_PASSWORD", "root"),
    "host": os.getenv("MYSQL_HOST", "mysql"),
    "port": int(os.getenv("MYSQL_PORT", 3306)),
}

start_time = time()
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


def wait_for_mysql(db, user, passwd, host, port):
    while time() - start_time < check_timeout:
        try:
            conn = MySQLdb.connect(
                db=db, user=user, passwd=passwd, host=host, port=port
            )
            logger.info("MySQL is ready! ✨ 💅")
            conn.close()
            return True
        except Exception:
            logger.info(
                f"MySQL isn't ready. Waiting for {check_interval} {interval_unit}..."
            )
            sleep(check_interval)

    logger.error(f"We could not connect to MySQL within {check_timeout} seconds.")
    return False


wait_for_mysql(**config)
