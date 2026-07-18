import json
import os
import urllib.request
import urllib.parse

def test_api():
    base_dir = os.path.dirname(__file__)
    lolos_path = os.path.abspath(os.path.join(base_dir, '..', 'frontend', 'constants', 'lolos_staff.json'))
    tidak_lolos_path = os.path.abspath(os.path.join(base_dir, '..', 'frontend', 'constants', 'tidak_lolos_staff.json'))

    with open(lolos_path, 'r', encoding='utf-8') as f:
        lolos_data = json.load(f)

    with open(tidak_lolos_path, 'r', encoding='utf-8') as f:
        tidak_lolos_data = json.load(f)

    lolos_nrps = list(lolos_data.keys())
    tidak_lolos_nrps = list(tidak_lolos_data.keys())

    print(f"Loaded {len(lolos_nrps)} lolos NRPs and {len(tidak_lolos_nrps)} tidak lolos NRPs.")

    base_url = "http://localhost:3000/api/announcement/check?nrp="

    def check_nrp(nrp, expected_status):
        url = base_url + urllib.parse.quote(nrp)
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode('utf-8'))
                    if data.get('status') == expected_status:
                        return True, data
                    else:
                        return False, f"Expected {expected_status}, got {data.get('status')}"
                else:
                    return False, f"HTTP Status {response.status}"
        except Exception as e:
            return False, str(e)
            
    print("Testing lolos NRPs...")
    lolos_passed = 0
    lolos_failed = []
    for nrp in lolos_nrps:
        success, result = check_nrp(nrp, 'lolos')
        if success:
            lolos_passed += 1
        else:
            lolos_failed.append((nrp, result))

    print(f"Lolos testing complete: {lolos_passed}/{len(lolos_nrps)} passed.")
    if lolos_failed:
        print("Failed lolos NRPs:")
        for nrp, err in lolos_failed[:5]:
            print(f"  {nrp}: {err}")
        if len(lolos_failed) > 5:
            print(f"  ... and {len(lolos_failed) - 5} more.")

    print("\nTesting tidak lolos NRPs...")
    tidak_lolos_passed = 0
    tidak_lolos_failed = []
    for nrp in tidak_lolos_nrps:
        success, result = check_nrp(nrp, 'tidak_lolos')
        if success:
            tidak_lolos_passed += 1
        else:
            tidak_lolos_failed.append((nrp, result))

    print(f"Tidak lolos testing complete: {tidak_lolos_passed}/{len(tidak_lolos_nrps)} passed.")
    if tidak_lolos_failed:
        print("Failed tidak lolos NRPs:")
        for nrp, err in tidak_lolos_failed[:5]:
            print(f"  {nrp}: {err}")
        if len(tidak_lolos_failed) > 5:
            print(f"  ... and {len(tidak_lolos_failed) - 5} more.")

    print("\nTesting an unregistered NRP...")
    unregistered_nrp = "9999999999"
    success, result = check_nrp(unregistered_nrp, 'tidak_terdaftar')
    if success:
        print("Unregistered NRP test passed.")
    else:
        print(f"Unregistered NRP test failed: {result}")

if __name__ == '__main__':
    test_api()
