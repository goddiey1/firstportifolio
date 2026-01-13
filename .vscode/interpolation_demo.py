import numpy as np
import matplotlib.pyplot as plt

# ==========================================
# PART 1: LAGRANGE INTERPOLATION 
# ==========================================

def lagrange_basis(x_values, i, x_eval):
    """
    Calculates the i-th Lagrange basis polynomial L_i(x).
    """
    L_i = 1
    for j in range(len(x_values)):
        if j != i:
            L_i *= (x_eval - x_values[j]) / (x_values[i] - x_values[j])
    return L_i

def lagrange_interpolation(x_values, y_values, x_eval):
    """
    Evaluates the Lagrange polynomial P(x) at x_eval.
    """
    P_x = 0
    for i in range(len(x_values)):
        P_x += y_values[i] * lagrange_basis(x_values, i, x_eval)
    return P_x

# --- Demonstration for Lagrange ---
print("--- Lagrange Interpolation Results ---")

# 1. Define a set of data points (Small set is better for Lagrange)
x_data = np.array([0, 1, 2, 3, 4])
y_data = np.array([1, 2.5, 2, 4.5, 3])

# 2. Generate smooth points for plotting the polynomial curve
x_smooth = np.linspace(min(x_data), max(x_data), 100)
y_lagrange = [lagrange_interpolation(x_data, y_data, val) for val in x_smooth]

# 3. Compare interpolated points with original data [cite: 21]
print(f"Original X Points: {x_data}")
print(f"Original Y Points: {y_data}")
# (Verification: The curve should pass exactly through these points)

# 4. Plotting
plt.figure(figsize=(10, 5))
plt.plot(x_smooth, y_lagrange, label='Lagrange Polynomial', color='blue')
plt.scatter(x_data, y_data, color='red', label='Original Data Points', zorder=5)
plt.title('Lagrange Interpolation')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.savefig('lagrange_plot.png') # Saves plot for your report
print("Plot saved as 'lagrange_plot.png'")
# plt.show() # Commented out to avoid blocking execution in non-interactive environment


# ==========================================
# PART 2: LEAST SQUARES APPROXIMATION 
# ==========================================

def least_squares_fit(x, y, degree=1):
    """
    Fits a polynomial of given degree to the data using Least Squares.
    Returns the coefficients and the fitted function.
    """
    # Using numpy's polyfit which implements Least Squares method
    coeffs = np.polyfit(x, y, degree)
    poly_func = np.poly1d(coeffs)
    return poly_func

# --- Demonstration for Least Squares ---
print("\n--- Least Squares Approximation Results ---")

# 1. Generate Noisy Data
np.random.seed(42) # For reproducibility
x_noisy = np.linspace(0, 10, 20)
true_y = 2.5 * x_noisy + 1.0
noise = np.random.normal(0, 2.0, size=len(x_noisy)) # Add random noise
y_noisy = true_y + noise

# 2. Perform Least Squares Fit (Linear fit, degree=1)
fitted_func = least_squares_fit(x_noisy, y_noisy, degree=1)
y_predicted = fitted_func(x_noisy)

# 3. Evaluate Accuracy (Compute Error) 
# Calculating Mean Squared Error (MSE)
mse = np.mean((y_noisy - y_predicted)**2)
rmse = np.sqrt(mse)

print(f"Fitted Model Equation: {fitted_func}")
print(f"Mean Squared Error (MSE): {mse:.4f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.4f}")

# 4. Plotting
plt.figure(figsize=(10, 5))
plt.scatter(x_noisy, y_noisy, color='gray', label='Noisy Data')
plt.plot(x_noisy, true_y, 'g--', label='True Underlying Relationship', alpha=0.5)
plt.plot(x_noisy, y_predicted, 'r-', label=f'Least Squares Fit (deg=1)', linewidth=2)
plt.title(f'Least Squares Approximation (RMSE: {rmse:.2f})')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.savefig('least_squares_plot.png') # Saves plot for your report
print("Plot saved as 'least_squares_plot.png'")
# plt.show() # Commented out to avoid blocking execution
